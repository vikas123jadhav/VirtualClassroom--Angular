import { Component, OnInit,Input } from '@angular/core';

interface carouselImage{
  imageSrc: string;
  imageAlt: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() indicators = true;
  contols= true;
  selectedIndex=0;
  
  sideNavStatus: boolean = false;
  autoSlide = true;
  slideInterval = 2000;  // default to 3 second
  constructor() { }

  ngOnInit(): void {
    if(this.autoSlide){
      this.autoSlideImage();
    }
  }
  
  // changes slide in every 3 seconds
  autoSlideImage(): void{
           setInterval(()=>{
            this.onNextClick();
           },this.slideInterval);
  }
  
  // sets index of images on dot/indicator click
  selectImage(index: number): void{
    this.selectedIndex = index;
  }
  
  onPrevClick(){
    if(this.selectedIndex === 0){
      this.selectedIndex =  this.images.length - 1;
    }
    else{
      this.selectedIndex--;
    }
  }

  onNextClick(){
    if(this.selectedIndex === this.images.length - 1){
       this.selectedIndex = 0;
    } else{
      this.selectedIndex++;
    }
  }
   images: carouselImage[]   = [
    {
      imageSrc :'https://thumbs.dreamstime.com/b/coaching-mentoring-education-business-training-development-e-learning-concept-97993328.jpg',
      imageAlt :'nature1'
    },
    {
      imageSrc :'https://thumbs.dreamstime.com/b/adult-education-rural-india-16553693.jpg',
      imageAlt :'nature2'
    },
    {
      imageSrc :'https://thumbs.dreamstime.com/b/education-icon-hand-innovative-online-e-learning-internet-technology-concept-webinar-knowledge-training-courses-skill-168577248.jpg',
      imageAlt :'nature3'
    },
    
    {
      imageSrc :'https://thumbs.dreamstime.com/b/photo-sales-team-working-modern-office-woman-using-generic-design-laptop-man-holding-pencil-account-manager-work-new-startup-71884470.jpg',
      imageAlt :'nature4'
    },
    {
      imageSrc :'https://thumbs.dreamstime.com/b/e-learning-education-internet-technology-webinar-online-courses-concept-e-learning-education-internet-technology-webinar-online-106245239.jpg',
       imageAlt :'nature5'
    },
    {
      imageSrc :'https://thumbs.dreamstime.com/b/education-teaching-learning-technology-people-concept-tw-two-high-school-students-classmates-helps-friend-catching-up-95507181.jpg',
      imageAlt :'nature6'
    },
    
    
  ]

}
