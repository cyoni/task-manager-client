interface Tag {
  id: number;
  name: string;
  color: string;
}

interface Task {
  id: number;
  title: string;
  description?: string;
  priority: number;
  status: number;
  plannedStartDate: Date;
  plannedEndDate: Date;
  tags: Tag[];
}
