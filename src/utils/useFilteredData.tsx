import { useState, useEffect, useMemo } from 'react';

type Location = string | null;
type Status = 'Active' | 'Inactive';

interface Filters {
  status: string;
  location: Location;
  searchQuery: string;
}

interface UseFilteredDataReturn<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
  totalItems: number;
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setStatus: (status: string) => void;
  setLocation: (location: Location) => void;
  setSearchQuery: (query: string) => void;
  currentFilters: Filters;
  updateActiveStatus: (id: number | string, newStatus: Status) => Promise<void>;
  deleteItem: (id: number | string) => void;
  statusUpdateLoading: boolean;
}

interface DataItem {
  id: number | string;
  name: string;
  status: string;
  location: string;
  current_status: string;
  hasWarning: boolean;
  health: { cloud?: string; device?: string; }
  recorder: string;
  tasks: string;
  _id: string;
  [key: string]: any;
}

export function useFilteredData<T extends DataItem>({
  initialPageSize = 10,
  initialFilters = {
    status: '',
    location: '',
    searchQuery: ''
  }
}: {
  initialPageSize?: number;
  initialFilters?: Partial<Filters>;
}): UseFilteredDataReturn<T> {
  const [rawData, setRawData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const [filters, setFilters] = useState<Filters>({
    status: initialFilters.status || '',
    location: initialFilters.location || '',
    searchQuery: initialFilters.searchQuery || ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_APIURL}/fetch/cameras`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_AUTHTOKEN}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setRawData(data.data);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('An error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const updateActiveStatus = async (id: number | string, newStatus: string) => {
    setStatusUpdateLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_APIURL}/update/camera/status  `, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 4ApVMIn5sTxeW7GQ5VWeWiy'
        },
        body: JSON.stringify({
          id,
          status: newStatus
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to update status: ${response.status}`);
      }

      setRawData(prevData =>
        prevData.map(item =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Failed to update status'));
      // throw e;
    } finally {
      setStatusUpdateLoading(false);
    }
  };

  const deleteItem = (id: number | string) => {
    setRawData(prevData => prevData.filter(item => item.id !== id));
  };

  const setStatus = (status: string) => {
    setFilters(prev => ({ ...prev, status }));
    setCurrentPage(1);
  };

  const setLocation = (location: Location) => {
    setFilters(prev => ({ ...prev, location }));
    setCurrentPage(1);
  };

  const setSearchQuery = (searchQuery: string) => {
    setFilters(prev => ({ ...prev, searchQuery }));
    setCurrentPage(1);
  };

  const {
    paginatedData,
    totalItems,
    totalPages
  } = useMemo(() => {
    let filtered = [...rawData];

    if (filters.status !== '') {
      filtered = filtered.filter(item => item.status === filters.status);
    }

    if (filters.location && filters.location !== '') {
      const selectedlocation = filters?.location?.toLowerCase().trim();
      console.log(selectedlocation)
      filtered = filtered.filter(item =>
        item.location.toLowerCase().includes(selectedlocation)
      );
    }

    if (filters.searchQuery.trim()) {
      const searchTerm = filters.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm)
      );
    }

    const total = filtered.length;
    const pages = Math.ceil(total / pageSize);

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const paginated = filtered.slice(start, end);

    return {
      filteredData: filtered,
      paginatedData: paginated,
      totalItems: total,
      totalPages: pages
    };
  }, [rawData, filters, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return {
    data: paginatedData,
    loading,
    error,
    totalItems,
    totalPages,
    currentPage,
    setCurrentPage: handlePageChange,
    setPageSize: handlePageSizeChange,
    setStatus,
    setLocation,
    setSearchQuery,
    currentFilters: filters,
    updateActiveStatus,
    deleteItem,
    statusUpdateLoading
  };
}