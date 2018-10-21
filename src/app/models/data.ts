export class DataModel {
  x: number;
  y: number;
  hue: number;
  time: Date;
  static CONVERT_API_MODEL = (data: DataAPIModel) =>
    <DataModel>{
      x: data.x_pos,
      y: data.y_pos,
      hue: data.hue,
      time: new Date(data.time)
    }
}

export class DataAPIModel {
  x_pos: number;
  y_pos: number;
  hue: number;
  time: string;

}
