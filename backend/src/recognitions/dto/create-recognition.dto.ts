export class CreateRecognitionDto {
  senderId: number;
  receiverId: number;
  recognitionList: Record<string, string>;
}
