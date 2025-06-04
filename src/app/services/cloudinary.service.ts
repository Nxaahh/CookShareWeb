import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  private cloudName = 'dp18ba4tj';
  private unsignedUploadPreset = 'cookshare_unsigned';

  constructor(private http: HttpClient) {}

  async subirImagen(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.unsignedUploadPreset);

    const response = await firstValueFrom(
      this.http.post<any>(
        `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`,
        formData
      )
    );

    return response.secure_url;
  }
}
