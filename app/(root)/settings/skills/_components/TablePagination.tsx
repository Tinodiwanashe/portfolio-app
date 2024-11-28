import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";
  import React from 'react';

  type TablePaginationProps = {
    loadNext: () => void;
    loadPrevious: () => void;
    status: "LoadingFirstPage" | "CanLoadMore" | "LoadingMore" | "Exhausted"
  }

const TablePagination = (props: TablePaginationProps) => {
  return (
    <Pagination>
        <PaginationContent>
            <PaginationItem>
                <PaginationPrevious onClick={() => props.loadPrevious()} href={""} />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem >
                <PaginationNext onClick={() => props.loadNext()} href={""} isActive={props.status === "CanLoadMore"}/>
            </PaginationItem>
        </PaginationContent>
    </Pagination>

  )
}

export default TablePagination