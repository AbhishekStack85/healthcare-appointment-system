from fastapi import APIRouter, HTTPException, Depends
from models.appointment import AppointmentCreate, AppointmentStatusUpdate
from database.connection import db
from bson import ObjectId
from auth import get_current_user

router = APIRouter()


@router.post("/appointments")
def create_appointment(
    appointment: AppointmentCreate,
    current_user=Depends(get_current_user)
):

    if current_user["role"] != "patient":
        raise HTTPException(
            status_code=403,
            detail="Only patients can book appointments"
        )

    new_appointment = {
        "patient_email": current_user["email"],
        "doctor_id": appointment.doctor_id,
        "appointment_date": appointment.appointment_date,
        "status": appointment.status
    }

    result = db.appointments.insert_one(new_appointment)

    return {
        "message": "Appointment booked successfully",
        "appointment_id": str(result.inserted_id)
    }


@router.get("/appointments")
def get_appointments(
    current_user=Depends(get_current_user)
):

    if current_user["role"] == "patient":

        appointments = list(
            db.appointments.find({
                "patient_email": current_user["email"]
            })
        )

    elif current_user["role"] == "doctor":

        doctor = db.doctors.find_one({
            "user_id": current_user["user_id"]
        })

        print("CURRENT USER:", current_user)
        print("DOCTOR PROFILE:", doctor)

        if not doctor:
            raise HTTPException(
                status_code=404,
                detail="Doctor profile not found"
            )

        appointments = list(
            db.appointments.find({
                "doctor_id": str(doctor["_id"])
            })
        )

    else:
        appointments = []

    for appointment in appointments:
        appointment["_id"] = str(appointment["_id"])
        appointment["appointment_date"] = (
            appointment["appointment_date"].isoformat()
        )

    return appointments


@router.delete("/appointments/{appointment_id}")
def cancel_appointment(
    appointment_id: str,
    current_user=Depends(get_current_user)
):

    if current_user["role"] != "patient":
        raise HTTPException(
            status_code=403,
            detail="Only patients can cancel appointments"
        )

    appointment = db.appointments.find_one({
        "_id": ObjectId(appointment_id)
    })

    if not appointment:
        raise HTTPException(
            status_code=404,
            detail="Appointment not found"
        )

    if appointment["patient_email"] != current_user["email"]:
        raise HTTPException(
            status_code=403,
            detail="You can only cancel your own appointments"
        )

    result = db.appointments.delete_one(
        {"_id": ObjectId(appointment_id)}
    )

    return {
        "message": "Appointment cancelled successfully"
    }


@router.patch("/appointments/{appointment_id}/status")
def update_appointment_status(
    appointment_id: str,
    status_data: AppointmentStatusUpdate,
    current_user=Depends(get_current_user)
):

    if current_user["role"] != "doctor":
        raise HTTPException(
            status_code=403,
            detail="Only doctors can update appointment status"
        )

    result = db.appointments.update_one(
        {"_id": ObjectId(appointment_id)},
        {
            "$set": {
                "status": status_data.status
            }
        }
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Appointment not found"
        )

    return {
        "message": "Appointment status updated successfully",
        "status": status_data.status
    }