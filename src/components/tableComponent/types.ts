export interface CheckboxBaseProps {
    onSelect?: () => void;
    checked?: boolean;
    id?: string;
    ariaLabel?: string;
  }
  
  export interface ColumnHeaderProps {
    label: string;
    uppercase?: boolean;
    width?:string;
  }
  
  export interface TableHeaderProps {
    onSelectAll?: () => void;
    allSelected?: boolean;
  }