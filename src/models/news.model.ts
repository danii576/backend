export interface News {
    id?: number;            // auto-increment
    title: string;
    content: string;
    image_url?: string;
    file_url?: string;
    created_at?: Date;
    updated_at?: Date;
    admin_id: number;       // ID of admin who created/updated
}
