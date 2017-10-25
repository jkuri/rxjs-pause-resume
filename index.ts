import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/never';
import 'rxjs/add/operator/timeInterval';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

const pauser = new Subject();

pauser
  .switchMap(paused => paused ? Observable.never() : source())
  .subscribe(x => console.log(x));

pauser.next(false);
setTimeout(() => {
  console.log('Pause, getting some rest!');
  pauser.next(true);

  setTimeout(() => {
    console.log('End of pause, get back to work!');
    pauser.next(false);
  }, 3000);
}, 3000);

function source(): Observable<Date> {
  return new Observable(observer => {
    Observable.timer(0, 1000)
      .timeInterval()
      .map(() => observer.next(new Date()))
      .subscribe();
  });
}
