import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recognition } from 'src/typeorm/entities/Recognition';
import { RecognitionValue } from 'src/typeorm/entities/RecognitionValue';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateRecognitionDto } from './dto/create-recognition.dto';

@Injectable()
export class RecognitionsService {
  constructor(
    private userService: UserService,
    @InjectRepository(Recognition)
    private recognitionRepository: Repository<Recognition>,
    @InjectRepository(RecognitionValue)
    private recognitionValueRepository: Repository<RecognitionValue>,
  ) {}

  async create({
    senderId,
    receiverId,
    recognitionList,
  }: CreateRecognitionDto) {
    const newRecognition = this.recognitionRepository.create({
      sender: await this.userService.findOneByUserId(senderId),
      receiver: await this.userService.findOneByUserId(receiverId),
    });

    const savedRecog = await this.recognitionRepository.save(newRecognition);

    const recogValues = await Promise.all(
      Object.entries(recognitionList).map(async ([value, detail]) => {
        const recogItem = this.recognitionValueRepository.create({
          recognition: savedRecog,
          value,
          detail,
        });
        return this.recognitionValueRepository.save(recogItem);
      }),
    );

    savedRecog['values'] = recogValues;
    return this.recognitionRepository.save(savedRecog);
  }

  async findAll(userId: number) {
    return this.recognitionRepository.find({
      select: {
        id: true,
        receiver: {
          id: true,
          profile: {
            firstname: true,
            lastname: true,
            location: true,
            department: true,
          },
        },
      },
      relations: ['values', 'receiver', 'receiver.profile'],
      where: {
        sender: await this.userService.findOneByUserId(userId),
      },
    });
  }

  async findOne(userId: number, recogId: number) {
    return this.recognitionRepository.findOne({
      where: {
        sender: await this.userService.findOneByUserId(userId),
        id: recogId,
      },
    });
  }
}
