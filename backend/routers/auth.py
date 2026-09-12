from fastapi import APIRouter, Depends
from backend.database import get_database
from backend.schemas import LoginRequest, SignupRequest, UserProfileResponse
from backend.services.auth_service import authenticate_user, register_user

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/login", response_model=UserProfileResponse)
async def login(request: LoginRequest, db = Depends(get_database)):
    """User authentication endpoint"""
    return await authenticate_user(db, request)


@router.post("/signup", response_model=UserProfileResponse)
async def signup(request: SignupRequest, db = Depends(get_database)):
    """User registration endpoint"""
    return await register_user(db, request)
