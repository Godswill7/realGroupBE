
export interface iStudent {
    email: string;
    password: string;
    studentName: string;
    phoneNumber: string;
    schoolName: string;
    HouseAddress: string;
    studentImage: string;
    studentImageID: string;
    gender: string;
    balance: number;
    feeHistory: {}[];
    bagHistory: Array<{}>;
  }
  

  export interface iFee {
    cash: number;
    studentID: string;
    schoolName: string;
  }

  export interface iBag {
    bag: number;
    cash: number;
    student: {};
  }
  