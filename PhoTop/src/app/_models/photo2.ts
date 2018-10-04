export * from './photo2';

export class Photo2 {
    photo_id: number;
    user_id: number;
    title: string;
    file_path: string;
    description: string;
    visibility: string;
    dateOfAddition: string;
    rating: number;
    number_of_ratings: number;
    currentUserRating: number;
    tags: string[];
}
