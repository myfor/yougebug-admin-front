import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServicesBase } from './common';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(
    private base: ServicesBase,
    private common: CommonService
  ) { }

  
}
