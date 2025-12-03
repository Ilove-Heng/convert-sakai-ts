import type { TrackingReportInfo } from '@/api';

export interface VirtualRowData {
  rowIndex: number;
  columns: Array<{
    postName: string;
  }>;
}

export function generateData(trackingReportInfo: TrackingReportInfo | null) {

  if (!trackingReportInfo) {
    return {
      columns: [],
      virtualizedData: []
    };
  }

  const columns = trackingReportInfo.tracking_reports.map((report) => ({
      key: report.post_name,
      posts: report.posts,
      post_id: report.post_id,
      post_name: report.post_name,
      width: 400
  }));

  const maxRowCount = Math.max(
      ...trackingReportInfo.tracking_reports.map((report) => Math.max(...report.posts.map((post) => post.numbers.length)))
  );

  const virtualizedData: VirtualRowData[] = [];

  // Add header row
  virtualizedData.push({
    rowIndex: 0,
    columns: trackingReportInfo.tracking_reports.map((report) => ({
      postName: report.post_name,
    }))
  });

  // Add data rows
   for (let rowIndex = 0; rowIndex < maxRowCount; rowIndex++) {
    virtualizedData.push({
      rowIndex: rowIndex + 1,
      columns: trackingReportInfo.tracking_reports.map((report) => {
        return {
          postName: report.post_name,
        };
      })
    });
  }

  return { columns, virtualizedData };
}
