from pydantic import BaseModel
from datetime import datetime
from typing import Literal


class AppointmentCreate(BaseModel):

    doctor_id: str

    appointment_date: datetime

    status: Literal["pending", "accepted", "rejected"] = "pending"


class AppointmentStatusUpdate(BaseModel):

    status: Literal["pending", "accepted", "rejected"]