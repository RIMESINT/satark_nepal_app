import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lighting-home',
  templateUrl: './lighting-home.page.html',
  styleUrls: ['./lighting-home.page.scss'],
})
export class LightingHomePage implements OnInit {

  activeTab: string;
  favourites = [
    {
      location: 'angul',
      condition: 'no lightning',
    },
    {
      location: 'Dhansala',
      condition: 'low lightning',
      advisory: [
        {
          headerName: "do's",
          content: [
            {
              img: '/assets/images/lightning/dos/dos_1.jpg',
              text: 'Lorem ipsum dolor sit amet. Ex dolore facere ut perferendis dicta rem rerum voluptas. ',
            },
            {
              img: '../../../../../assets/home/buttons/heatwave_ic.svg',
              text: 'Lorem ipsum dolor sit amet. Ex dolore facere ut perferendis dicta rem rerum voluptas. ',
            },
            {
              img: '../../../../../assets/home/buttons/heatwave_ic.svg',
              text: 'Lorem ipsum dolor sit amet. Ex dolore facere ut perferendis dicta rem rerum voluptas. ',
            },
          ],
        },

        {
          headerName: "dont's",
          content: [
            {
              img: '../../../../../assets/home/buttons/heatwave_ic.svg',
              text: 'Lorem ipsum dolor sit amet. Ex dolore facere ut perferendis dicta rem rerum voluptas. ',
            },
            {
              img: '../../../../../assets/home/buttons/heatwave_ic.svg',
              text: 'Lorem ipsum dolor sit amet. Ex dolore facere ut perferendis dicta rem rerum voluptas. ',
            },
          ],
        },
      ],
    },
  ];
  lightning = {
    location: 'Lalitpur, NP',
    condition: 'heavy lightning',
    temperature: '33',
    advisory: [
      {
        headerName: "do's",
        content: [
          {
            img: '/assets/images/lightning/dos/dos_1.svg',
            text: 'When thunderstorm comes, go out of water',
          },
          {
            img: '/assets/images/lightning/dos/dos_2.svg',
            text: 'When thunder roars, go indoors',
          },
          {
            img: '/assets/images/lightning/dos/dos_3.svg',
            text: 'If in an open field, crouch down and put your feet together ',
          },
          {
            img: '/assets/images/lightning/dos/dos_4.svg',
            text: 'Perform CPR immediately on the victim of lightning',
          },
          {
            img: '/assets/images/lightning/dos/dos_5.svg',
            text: 'Avoid taking bath during lightning storm as current can easily pass through water',
          },
          {
            img: '/assets/images/lightning/dos/dos_6.svg',
            text: 'Unplug unnecesssary electrical equipments and avoid using corded telephones',
          },
        ],
      },

      {
        headerName: "dont's",
        content: [
          {
            img: '../../../../../assets/home/buttons/lightning_ic.svg',
            text: 'Lorem ipsum dolor sit amet. Ex dolore facere ut perferendis dicta rem rerum voluptas. ',
          },
          {
            img: '../../../../../assets/home/buttons/lightning_ic.svg',
            text: 'Lorem ipsum dolor sit amet. Ex dolore facere ut perferendis dicta rem rerum voluptas. ',
          },
        ],
      },
    ],
  };

  constructor() { 
    this.activeTab = 'current';
  }

  ngOnInit() {
  }

}
