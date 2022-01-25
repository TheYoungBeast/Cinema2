import { Component, OnInit, OnDestroy } from '@angular/core';
import Room from 'src/app/data/room';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/DataService/data-service.service';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})

export class EditRoomComponent implements OnInit, OnDestroy {

  private id: number = 0;
  private sub: any;
  room: Room = {} as Room;

  constructor(private cinemaDataService: DataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe( params => {
      this.id = +params['id'];
    })

    this.cinemaDataService.getData().subscribe( data => this.room = data.rooms[this.id] );

  }

  verifyForm(form: NgForm): void {
    if(form.valid) {
      this.cinemaDataService.editRoom(this.id, form.value as Room);
      this.router.navigate(['rooms']);
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}