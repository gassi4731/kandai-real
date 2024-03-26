type Memory = {
  id: string;
  index?: number;
  day?: number;
  time?: string;
  createdAt: Date;
  imageName: string;
  reactions: Map<string, number>;
};
