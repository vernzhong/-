export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
}

export function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export function getWeekDates(date: Date): string[] {
  const current = new Date(date);
  const day = current.getDay();
  current.setDate(current.getDate() - day);
  const week: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(current);
    d.setDate(current.getDate() + i);
    week.push(d.toISOString().split('T')[0]);
  }
  return week;
}

export function getMonthlyDates(date: Date): string[] {
  const month = date.getMonth();
  const current = new Date(date.getFullYear(), month, 1);
  const lastDate = new Date(current.getFullYear(), month + 1, 0);
  const dates: string[] = [];
  for (let i = 1; i <= lastDate.getDate(); i++) {
    dates.push(new Date(current.getFullYear(), month, i).toISOString().split('T')[0]);
  }
  return dates;
}

export function debounce(fn: (...args: any[]) => void, delay: number): (...args: any[]) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}