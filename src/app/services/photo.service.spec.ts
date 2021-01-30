import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { PhotoService } from './photo.service';

describe('PhotoService', () => {
  let service: PhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoService);
  });

  it('should be created', async () => {
    expect(service).toBeTruthy();
    const capturedPhoto = { path: "blob:http://localhost:8100/e23fbe29-a57f-4cbb-b6ca-9fa28b435115", format: "jpeg" }
    const base64data = 'TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0aGlzIHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGx1c3Qgb2YgdGhlIG1pbmQsIHRoYXQgYnkgYSBwZXJzZXZlcmFuY2Ugb2YgZGVsaWdodCBpbiB0aGUgY29udGludWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb24gb2Yga25vd2xlZGdlLCBleGNlZWRzIHRoZSBzaG9ydCB2ZWhlbWVuY2Ugb2YgYW55IGNhcm5hbCBwbGVhc3VyZS4 ='

    const spy = jest.spyOn(service, 'getPhoto').mockResolvedValue(capturedPhoto);
    jest.spyOn(service, 'readAsBase64').mockResolvedValue(base64data);
    jest.spyOn(service, 'writeFile').mockResolvedValue({ uri: '1611314851258.jpeg' });

    await service.addNewToGallery();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(service.photos.length).toBe(1);
  });
});
