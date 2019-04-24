import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-save-file-icon',
  templateUrl: './save-file-icon.component.html',
  styleUrls: ['./save-file-icon.component.scss']
})
export class SaveFileIconComponent {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'save-file',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/baseline-save_alt-24px.svg'));
   }


}
