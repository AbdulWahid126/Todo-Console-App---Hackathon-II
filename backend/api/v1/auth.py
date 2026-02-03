"""
Authentication API endpoints
Task: P2-T-027
From: specs/phase-ii/auth-spec
"""

from datetime import timedelta, datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from models.user import User, UserCreate, UserLogin, Token, UserPublic
from utils.security import authenticate_user, create_access_token, get_current_user
from database.session import get_session

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/signup", response_model=Token)
def register_user(user_create: UserCreate, session: Session = Depends(get_session)):
    """
    Register a new user
    Task: P2-T-027
    From: specs/phase-ii/auth-spec
    """
    try:
        # Check if user with this email already exists
        existing_user = session.exec(select(User).where(User.email == user_create.email)).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="A user with this email already exists"
            )

        # Hash the password
        hashed_password = user_create.hash_password(user_create.password)

        # Create new user
        db_user = User(
            email=user_create.email,
            name=user_create.name,
            hashed_password=hashed_password,
            is_active=True,
            is_verified=False
        )

        session.add(db_user)
        session.commit()
        session.refresh(db_user)

        # Create access token for auto-login
        access_token_expires = timedelta(minutes=30)
        access_token = create_access_token(
            data={"sub": db_user.id, "email": db_user.email},
            expires_delta=access_token_expires
        )

        return {
            "token": access_token,
            "token_type": "bearer",
            "user": db_user
        }
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        # Log the error for debugging
        print(f"Registration error: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An internal error occurred during registration"
        )


@router.post("/signin", response_model=Token)
def login_user(user_login: UserLogin, session: Session = Depends(get_session)):
    """
    Login user and return access token
    Task: P2-T-028
    From: specs/phase-ii/auth-spec
    """
    user = authenticate_user(session, user_login.email, user_login.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Update last login time
    user.last_login = datetime.utcnow()
    session.add(user)
    session.commit()

    # Create access token
    access_token_expires = timedelta(minutes=30)  # Could be configurable
    access_token = create_access_token(
        data={"sub": user.id, "email": user.email},
        expires_delta=access_token_expires
    )

    return {
        "token": access_token,
        "token_type": "bearer",
        "user": user
    }


@router.get("/profile", response_model=UserPublic)
def get_profile(current_user: User = Depends(get_current_user)):
    """
    Get current user's profile
    Task: P2-T-029
    From: specs/phase-ii/auth-spec
    """
    return current_user


@router.post("/logout")
def logout_user():
    """
    Logout user (client-side token removal)
    Task: P2-T-030
    From: specs/phase-ii/auth-spec
    """
    # In a stateless JWT system, logout is handled client-side by removing the token
    # This endpoint can be used for logging or other server-side cleanup if needed
    return {"message": "Successfully logged out"}