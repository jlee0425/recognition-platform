import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRecognitionDto } from './dto/create-recognition.dto';
import { RecognitionsService } from './recognitions.service';

@Controller('recognitions')
export class RecognitionsController {
  constructor(private readonly recognitionsService: RecognitionsService) {}

  @Post()
  create(@Body() createRecognitionDto: CreateRecognitionDto) {
    return this.recognitionsService.create(createRecognitionDto);
  }

  @Get()
  findAllByUser(@Param('userId') userId: number) {
    return this.recognitionsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Param('userId') userId: number) {
    return this.recognitionsService.findOne(userId, id);
  }
}
