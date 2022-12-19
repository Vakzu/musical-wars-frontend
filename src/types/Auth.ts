export type LoginRequest = {
    username: string,
    password: string
}

export type LoginResponse = {
    username: string,
    userId: string
}

export type RegisterRequest = {
    username: string,
    password: string,
    confirmPassword: string
}

export type RegisterResponse = LoginResponse

