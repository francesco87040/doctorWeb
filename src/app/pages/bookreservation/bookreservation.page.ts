import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarMode, Step } from 'ionic7-calendar';
import { httpClientService } from 'src/app/services/httpClient.service';
import { StorageService } from 'src/app/services/storage.service';
import { AlertService } from 'src/app/services/alertService.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserCommand } from 'src/app/command/user-command';
import { Reservation } from 'src/types/types';

@Component({
  selector: 'app-bookreservation',
  templateUrl: './bookreservation.page.html',
  styleUrls: ['./bookreservation.page.scss'],
})
export class BookreservationPage {
  selectDoctor:any
  doctorList:UserCommand[];
  doctorId: string;
  user: any;
  eventSource: any
  viewTitle: any
  isToday: boolean;
  reservationDate: any
  calendar = {
    mode: 'month' as CalendarMode,
    step: 30 as Step,
    currentDate: new Date(),
    dateFormatter: {
      formatMonthViewDay: function (date: Date) {
        return date.getDate().toString();
      },
      formatMonthViewDayHeader: function (date: Date) {
        return 'MonMH';
      },
      formatMonthViewTitle: function (date: Date) {
        return 'testMT';
      },
      formatWeekViewDayHeader: function (date: Date) {
        return 'MonWH';
      },
      formatWeekViewTitle: function (date: Date) {
        return 'testWT';
      },
      formatWeekViewHourColumn: function (date: Date) {
        return 'testWH';
      },
      formatDayViewHourColumn: function (date: Date) {
        return 'testDH';
      },
      formatDayViewTitle: function (date: Date) {
        return 'testDT';
      }
    }
  };

  constructor(
    private httpClient: httpClientService,
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService
  ) { }

  ionViewWillEnter() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.doctorId = params['doctorId'];
    });
    
    console.log(this.doctorId);

    this.httpClient
      .post(
        'http://localhost:8081/sistema-di-prenotazioni/api/reservation/getDoctorReservation',
        { idDoctor: this.doctorId }
      )
      .subscribe(
        (res) => {
          console.log(res);
        },
        (error) => {
          alert(error?.message ?? error);
        }
      );
      
  }
  ngOnInit() {
    this.user = JSON.parse(this.storageService.localGet('user')!);
    this.calendar.mode = 'month';

    this.httpClient.post('http://localhost:8081/sistema-di-prenotazioni/api/user/getuseradmin', { roles: 'ROLE_ADMIN' }).subscribe( (res) => {
      this.doctorList=res;
      console.log(res);
    })
  }

  

  


  bookReservation() {
    this.spinner.show()
    debugger
    this.httpClient.post('http://localhost:8081/sistema-di-prenotazioni/api/reservation/create',
      { idDoctor: this.doctorId ?? this.selectDoctor.id, idUser: this.user.id, name: this.user.name, surname: this.user.surname, reservationDate: new Date(this.reservationDate), status: 'PENDING' }).subscribe((res) => {
        this.spinner.hide()
        if (res.code == 'KO') {
          this.alertService.showError('Errore', res.message)
        } else {
          this.alertService.showError('Prenotazione Effettuata!', 'La prenotazione è andata a buon fine ')
        }
        console.log(res);
      }
      )
  }

  loadEvents() {
    this.eventSource = this.createRandomEvents();
  }

  onViewTitleChanged(title: any) {
    this.viewTitle = title;
  }

  onEventSelected(event: any) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  onTimeSelected(ev: any) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    this.reservationDate = ev.selectedTime
  }

  onCurrentDateChanged(event: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }

  createRandomEvents() {
    var events = [];
    for (var i = 0; i < 50; i += 1) {
      var date = new Date();
      var eventType = Math.floor(Math.random() * 2);
      var startDay = Math.floor(Math.random() * 90) - 45;
      var endDay = Math.floor(Math.random() * 2) + startDay;
      var startTime;
      var endTime;
      if (eventType === 0) {
        startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
        if (endDay === startDay) {
          endDay += 1;
        }
        endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
        events.push({
          title: 'All Day - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: true
        });
      } else {
        var startMinute = Math.floor(Math.random() * 24 * 60);
        var endMinute = Math.floor(Math.random() * 180) + startMinute;
        startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
        endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
        events.push({
          title: 'Event - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: false
        });
      }
    }
    return events;
  }
  onRangeChanged(ev: any) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }
  markDisabled = (date: Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };


}
