import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Report {
  @Prop({
    type: String,
    required: true,
  })
  type: '게시글' | '사용자' | '채팅';

  @Prop({
    type: String,
    required: true,
  })
  reportId: string;

  @Prop({
    type: String,
    required: true,
  })
  reason: string;
}

export type ReportDocument = Report & Document;

export const ReportSchema = SchemaFactory.createForClass(Report);
