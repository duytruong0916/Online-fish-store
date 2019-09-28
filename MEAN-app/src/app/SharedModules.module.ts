import { NgModule } from '@angular/core';
import {MatButtonModule,
        MatCheckboxModule,
        MatBadgeModule,
        MatIconModule,
        MatMenuModule,
        MatDividerModule,
        MatToolbarModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatSelectModule,
        MatListModule,
        MatExpansionModule,
        MatDialogModule,
        MatCardModule,
        MatInputModule} from '@angular/material';

const MaterialsModules = [MatButtonModule,
                          MatCheckboxModule,
                          MatBadgeModule,
                          MatCardModule,
                          MatIconModule,
                          MatMenuModule,
                          MatDividerModule,
                          MatToolbarModule,
                          MatSidenavModule,
                          MatFormFieldModule,
                          MatSelectModule,
                          MatListModule,
                          MatExpansionModule,
                          MatDialogModule,
                          MatInputModule];

@NgModule({
  imports: [MaterialsModules],
  exports: [MaterialsModules]
})
export class MyOwnCustomMaterialModule { }
