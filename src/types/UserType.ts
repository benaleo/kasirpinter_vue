export type UserType = {
    id: string
    email: string
    name: string
    last_sign_in_at: string
}

export type supabaseUser = {
    id: string
    aud: string
    role: string
    email: string
    email_confirmed_at: string | null
    phone: string
    confirmed_at: string | null
    last_sign_in_at: string | null
    app_metadata: Record<string, any>
    user_metadata: Record<string, any>
    identities: Array<{
        identity_id: string
        id: string
        user_id: string
        identity_data: Record<string, any>
        provider: string
        last_sign_in_at: string
        created_at: string
        updated_at: string
    }>
    created_at: string
    updated_at: string
}