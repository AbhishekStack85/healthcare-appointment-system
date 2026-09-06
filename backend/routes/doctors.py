from fastapi import APIRouter
from models.doctor import DoctorCreate
from database.connection import db

router = APIRouter()


@router.post("/doctors")
def create_doctor(doctor: DoctorCreate):

    new_doctor = {
        "user_id": doctor.user_id,
        "name": doctor.name,
        "specialization": doctor.specialization,
        "experience": doctor.experience,
        "available": doctor.available
    }

    result = db.doctors.insert_one(new_doctor)

    return {
        "message": "Doctor created successfully",
        "doctor_id": str(result.inserted_id)
    }


@router.get("/doctors")
def get_doctors():

    doctors = list(db.doctors.find())

    for doctor in doctors:
        doctor["_id"] = str(doctor["_id"])

    return doctors