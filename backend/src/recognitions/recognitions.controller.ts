import {
  Body,
  Controller,
  Get,
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
    return this.recognitionsService.findAllByMe(req['user'].userId);
  }

  @UseGuards(AuthGuard)
  @Get('received')
  findAllForMe(@Request() req) {
    return this.recognitionsService.findAllForMe(req['user'].userId);
  }

  @UseGuards(AuthGuard)
  @Get('team')
  findAllTeamRecognition(@Request() req) {
    return this.recognitionsService.findAllForMyTeam(req['user'].userId);
  }
}
