export * from './photo';

export class Photo {
    photo_id: number;
    user_id: number;
    title: string;
    file_path: string;
    description: string;
    visibility: string;
    date_of_addition: Date;
    rating: number;
    number_of_ratings: number;
}
