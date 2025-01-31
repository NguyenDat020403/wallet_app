type Resource = {
  url: string;
  desc: string;
};

type Category = {
  name: string;
  resource: Resource[];
  quantity: number;
};
