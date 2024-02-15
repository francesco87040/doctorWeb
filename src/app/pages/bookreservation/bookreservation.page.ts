import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { httpClientService } from 'src/app/services/httpClient.service';
import { StorageService } from 'src/app/services/storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserCommand } from 'src/app/command/user-command';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays } from 'date-fns';
import { Subject } from 'rxjs';
import { showError } from 'src/app/services/showErrorService.service';
import { AlertService } from 'src/app/services/alertService.service';


const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-bookreservation',
  templateUrl: './bookreservation.page.html',
  styleUrls: ['./bookreservation.page.scss'],
})
export class BookreservationPage {
  doctorList: UserCommand[];
  doctorId: string;
  user: any;
  eventSource: any
  viewTitle: any
  isToday: boolean;
  reservationDate: any
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  refresh = new Subject<void>();

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  reservationList: any[] = []

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt">modifica</i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.modalService.showModal(event.id!)
      },
    },
  ];

  constructor(
    private httpClient: httpClientService,
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService,
    private spinner: NgxSpinnerService,
    private showError: showError,
    private modalService: AlertService
  ) { }


  ionViewWillEnter() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.doctorId = params['doctorId'];
    });

    this.loadDoctor()
  }

  ngOnInit() {
    this.user = JSON.parse(this.storageService.localGet('user')!);

    this.httpClient.post('http://localhost:8081/sistema-di-prenotazioni/api/user/getuseradmin', { roles: 'ROLE_ADMIN' }).subscribe((res) => {
      this.doctorList = res;
      console.log(res);
    })
  }

  bookReservation() {
    this.spinner.show()
    this.httpClient.post('http://localhost:8081/sistema-di-prenotazioni/api/reservation/create',
      { idDoctor: this.doctorId, idUser: this.user.id, name: this.user.name, surname: this.user.surname, reservationDate: new Date(this.reservationDate), status: 'PENDING' }).subscribe((res) => {
        this.spinner.hide()
        if (res.code == 'KO') {
          this.showError.presentAlert('Prenotazione già presente', "Il giorno e l'orario da voi selezionati sono già prenotati", ['riprova'])
        } else {
          this.showError.presentAlert('Prenotazione effettuata', 'La prenotazione è stata effettuata correttamente', ['ok'])
        }
        console.log(res);
      }
      )
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.reservationDate = date
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(reservations: any[]): void {
    reservations.forEach(element => {
      this.events.push({
        title: 'Prenotazione di ' + element.name + ' ' + element.surname,
        start: startOfDay(new Date(element.reservationDate)),
        end: endOfDay(addDays(new Date(element.reservationDate), 1)),
        id: element.id,
        color: colors['red'],
        draggable: false,
        resizable: {
          beforeStart: false,
          afterEnd: false,

        },
        actions: this.actions,

      },
      )
    });
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  loadDoctor() {
    if(this.doctorId){
      this.httpClient
      .post(
        'http://localhost:8081/sistema-di-prenotazioni/api/reservation/getDoctorReservation',
        { idDoctor: this.doctorId }

      )
      .subscribe(
        (res) => {
          this.reservationList = res.data;
          this.addEvent(res.data);
          console.log(this.reservationList);

        },
        (error) => {
          this.showError.presentAlert('Impossibile visualizzare i dottori', 'Non è stato possibile recuperare i dottori', ['riprova'])
        }
      );
        
    }
   
  }
  
}
