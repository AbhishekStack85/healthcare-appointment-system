from pydantic import BaseModel


class DoctorCreate(BaseModel):
    user_id: str
    name: str
    specialization: str
    experience: int
    available: bool = True