import { Category, DataSource, PassportStatus } from './types';

export function scoreColor(score: number): string {
  if (score >= 7) return '#3B6D11'; // green
  if (score >= 4) return '#BA7517'; // orange
  return '#A32D2D'; // red
}

export function sourceIcon(source: DataSource): string {
  const iconMap: Record<DataSource, string> = {
    iot: 'cpu',
    csv: 'table-import',
    manual: 'forms',
    api: 'api',
  };
  return iconMap[source] || 'circle';
}

export function categoryIcon(category: Category): string {
  const iconMap: Record<Category, string> = {
    appliance: 'wash-machine',
    energy: 'solar-panel',
    packaging: 'box',
    electronics: 'circuit-board',
    industrial: 'settings',
  };
  return iconMap[category] || 'file';
}

export function categoryBg(category: Category): string {
  const bgMap: Record<Category, string> = {
    appliance: 'bg-blue-100',
    energy: 'bg-green-100',
    packaging: 'bg-yellow-100',
    electronics: 'bg-red-100',
    industrial: 'bg-gray-100',
  };
  return bgMap[category] || 'bg-gray-100';
}

export function statusBadgeClass(status: PassportStatus): string {
  const classMap: Record<PassportStatus, string> = {
    verified: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    fail: 'bg-red-100 text-red-800',
  };
  return classMap[status];
}

export function statusIcon(status: PassportStatus): string {
  const iconMap: Record<PassportStatus, string> = {
    verified: 'shield-check',
    pending: 'clock',
    fail: 'alert-circle',
  };
  return iconMap[status];
}

export function statusLabel(status: PassportStatus): string {
  const labelMap: Record<PassportStatus, string> = {
    verified: 'Verified',
    pending: 'Pending ZK',
    fail: 'Validation fail',
  };
  return labelMap[status];
}
