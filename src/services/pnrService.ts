export interface PassengerDetails {
  number: string;
  currentStatus: string;
  bookingStatus: string;
}

export interface JourneyDetails {
  trainNumber?: string;
  trainName?: string;
  flightNumber?: string;
  airline?: string;
  from: string;
  to: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  class: string;
  quota?: string;
  seatNumber?: string;
}

export interface PNRResponse {
  pnr: string;
  passengers: PassengerDetails[];
  journey: JourneyDetails;
  chartPrepared: boolean;
  transportType: 'train' | 'flight';
}


const MOCK_TRAIN_DATA: PNRResponse = {
  pnr: '1234567890',
  passengers: [
    {
      number: '1',
      currentStatus: 'CNF/B2/12',
      bookingStatus: 'Confirmed'
    },
    {
      number: '2',
      currentStatus: 'CNF/B2/13',
      bookingStatus: 'Confirmed'
    }
  ],
  journey: {
    trainNumber: '12345',
    trainName: 'Rajdhani Express',
    from: 'New Delhi',
    to: 'Mumbai Central',
    date: '2024-01-15',
    departureTime: '16:55',
    arrivalTime: '08:15',
    class: 'AC 3 Tier',
    quota: 'General'
  },
  chartPrepared: false,
  transportType: 'train'
};

const MOCK_FLIGHT_DATA: PNRResponse = {
  pnr: 'ABCD1234',
  passengers: [
    {
      number: '1',
      currentStatus: 'CNF/12A',
      bookingStatus: 'Confirmed'
    }
  ],
  journey: {
    flightNumber: 'AI-101',
    airline: 'Air India',
    from: 'Delhi',
    to: 'Mumbai',
    date: '2024-01-15',
    departureTime: '10:00',
    arrivalTime: '12:00',
    class: 'Economy',
    seatNumber: '12A'
  },
  chartPrepared: true,
  transportType: 'flight'
};


export class RailwayPNRService {

  async checkPNRStatus(pnrNumber: string): Promise<PNRResponse> {
    try {
      if (!this.validatePNR(pnrNumber)) {
        throw new Error('Invalid PNR number. PNR should be 10 digits.');
      }

      await new Promise(resolve => setTimeout(resolve, 600));
      return { ...MOCK_TRAIN_DATA, pnr: pnrNumber };
    } catch (error) {
      throw new Error(`Failed to check railway PNR: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private validatePNR(pnr: string): boolean {
    return /^\d{10}$/.test(pnr);
  }
}


export class AviationPNRService {

  
  async checkPNRStatus(pnrNumber: string): Promise<PNRResponse> {
    try {
      if (!this.validatePNR(pnrNumber)) {
        throw new Error('Invalid PNR number format.');
      }

      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return {
        ...MOCK_FLIGHT_DATA,
        pnr: pnrNumber
      };
    } catch (error) {
      throw new Error(`Failed to check aviation PNR: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private validatePNR(pnr: string): boolean {
    return pnr.length >= 6 && pnr.length <= 10;
  }
}

export class PNRService {
  private railwayService: RailwayPNRService;
  private aviationService: AviationPNRService;

  constructor() {
    this.railwayService = new RailwayPNRService();
    this.aviationService = new AviationPNRService();
  }

 
  async checkPNRStatus(pnrNumber: string, transportType: 'train' | 'flight'): Promise<PNRResponse> {
    switch (transportType) {
      case 'train':
        return await this.railwayService.checkPNRStatus(pnrNumber);
      case 'flight':
        return await this.aviationService.checkPNRStatus(pnrNumber);
      default:
        throw new Error('Invalid transport type');
    }
  }

 
  getAvailableTransportTypes(): Array<{ value: string; label: string; icon: string }> {
    return [
      { value: 'train', label: 'Train', icon: '🚂' },
      { value: 'flight', label: 'Flight', icon: '✈️' }
    ];
  }
}

export default new PNRService();
