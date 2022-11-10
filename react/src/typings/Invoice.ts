import { Card } from "./Card";

export interface Invoice {
    id :string; 
    date: string;
    time: string;
    card: Card;
    cost: number;
}