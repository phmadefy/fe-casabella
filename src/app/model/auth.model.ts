export interface LoginRequestBody {
    grant_type: string;
    client_id: string;
    client_secret: string;
    email: string;
    password: string;
    scope: string;
}
