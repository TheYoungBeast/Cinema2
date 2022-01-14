import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Room } from 'src/app/interface/room';
import { DataService } from 'src/app/services/DataService/data-service.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {

  constructor(private dataService: DataService, private route: Router) { }

  ngOnInit(): void {
  }

  verifyForm(f: NgForm): void {
    if(f.valid) {
      this.dataService.addRoom(f.value as Room);
      this.route.navigate(['rooms']);
    }
  }

}
