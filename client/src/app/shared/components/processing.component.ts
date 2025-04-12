import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-processing',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="flex flex-col items-center space-y-2">
        <div class="flex space-x-2">
          <div class="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
          <div
            class="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-200"
          ></div>
          <div
            class="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-400"
          ></div>
        </div>
        <span class="text-white mt-4">Processing, please wait...</span>
      </div>
    </div>
  `,
})
export class ProcessingComponent {}
