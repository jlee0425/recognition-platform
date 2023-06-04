import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateRecognitionDto } from './dto/create-recognition.dto';
import { RecognitionsService } from './recognitions.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('recognitions')
export class RecognitionsController {
  constructor(private readonly recognitionsService: RecognitionsService) {}

  @Post()
  create(@Body() createRecognitionDto: CreateRecognitionDto) {
    return this.recognitionsService.create(createRecognitionDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAllByUser(@Request() req) {
    return this.recognitionsService.findAll(req['user'].userId);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Param('userId') userId: number) {
    return this.recognitionsService.findOne(userId, id);
  }
}
