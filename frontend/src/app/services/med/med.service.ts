import { Injectable } from '@angular/core';
import { Med } from '../../shared/models/Med';
import { Tag } from '../../shared/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class MedService {

  constructor() { }

  getMedById(id: number) {
    return this.getAll().find(product => product.id == id);
  }

  getAllTags():Tag[] {
    return [
      { name: 'All', count: 8},
      { name: 'General Medicine', count: 4},
      { name: 'Body Health', count: 3},
      { name: 'Dentistry', count: 1},
      { name: 'X-ray examination', count: 1},
    ]
  }

  getAllMedsByTag(tag: string): Med[] {
    if (tag == "All") {
      return this.getAll();
    }
    else {
      return this.getAll().filter(med => med.tags?.includes(tag))
    }
  }

  getAll():Med[] {
    return [
      {
        id: 1,
        name: 'Dental check-up',
        price: 30,
        tags: ['Dentistry'],
        imageUrl: 'https://www.novadent.ru/upload/iblock/75f/impo331b969m0tr0jvm4hnqm894wkwzo.jpg'
      },
      {
        id: 2,
        name: 'Therapeutic massage',
        price: 25,
        tags: ['Body Health'],
        imageUrl: 'https://ice-face.ru/wp-content/uploads/2022/07/crop-anonymous-masseuse-doing-face-massage-to-fema-2023-04-06-20-28-41-utc_%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9-%D1%80%D0%B0%D0%B7%D0%BC%D0%B5%D1%80-scaled.jpg'
      },
      {
        id: 3,
        name: 'General inspection',
        price: 25,
        tags: ['General Medicine'],
        imageUrl: 'https://zatotravma.ru/wp-content/uploads/2023/02/uslugi-LOR-1-1024x576.jpg'
      },
      {
        id: 4,
        name: 'Therapists examination',
        price: 25,
        tags: ['General Medicine'],
        imageUrl: 'https://vizit-med.ru/wp-content/uploads/2018/02/Terapevt.jpg'
      },
      {
        id: 5,
        name: 'Physical therapy',
        price: 50,
        tags: ['Body Health'],
        imageUrl: 'https://familyhc.kz/assets/images/servis/psd4ddnt064.jpg'
      },
      {
        id: 6,
        name: 'Fluorography',
        price: 25,
        tags: ['X-ray examination'],
        imageUrl: 'https://arimed.ru/wp-content/uploads/2023/12/244-2.jpg'
      },
      {
        id: 7,
        name: 'Oculists examination',
        price: 25,
        tags: ['General Medicine'],
        imageUrl: 'https://artem-doctors.com.ua/wp-content/uploads/usluga/ophtalmologiya.jpg'
      },
      {
        id: 8,
        name: 'Examination by a nutritionist',
        price: 25,
        tags: ['Body Health', 'General Medicine'],
        imageUrl: 'https://vidnova.center/wp-content/uploads/2022/01/703-1629441253-nadira-post-material.jpeg'
      },
    ]
  }
}
