from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.schemas import LoginRequest, SignupRequest, UserProfileResponse
from backend.services import auth_service

router = APIRouter(prefix="/auth", tags=["Authentication & Profile"])


@router.post("/login", response_model=UserProfileResponse)
async def login(
    request: LoginRequest,
    db: Session = Depends(get_db)
):
    return auth_service.authenticate_user(db, request)


@router.post("/signup", response_model=UserProfileResponse)
async def signup(
    request: SignupRequest,
    db: Session = Depends(get_db)
):
    return auth_service.register_user(db, request)
