import mongoose, { Document } from 'mongoose';
type Item = {
  id: number;
  created_at: string;
  created_at_i: number;
  type: string;
  author: string;
  title: string;
  url?: string;
  text: string;
  points: number;
  parent_id?: number;
  story_id?: number;
  children: Item[];
};
interface Job extends Document {
  json: Item;
}
const JobsSchema = new mongoose.Schema({ json: Object });
const Jobs = mongoose.model<Job>('jobs', JobsSchema);
export { Jobs };
