export class Guid {
  private _guid: string = '';

  constructor() {
    let s4 = ()=>{
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    this._guid = [s4(), s4(), '-', s4(), '-', s4(), '-', s4(), '-', s4(), s4(), s4()].join('');
  }

  public toString(): string {
    return this._guid;
  }
}
