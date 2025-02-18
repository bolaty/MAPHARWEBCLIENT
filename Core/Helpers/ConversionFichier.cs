using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;
using System.Web.Hosting;

namespace Core
{
    public class ConversionFichier
    {
        public static string extentionDocument(string extention, string fileName, ReportDocument documentRpt, string cheminFichier)
        {
            if (string.IsNullOrWhiteSpace(extention))
            {
                fileName += ".pdf";
                documentRpt.ExportToDisk(ExportFormatType.PortableDocFormat, cheminFichier + fileName);
            }
            else
            {
                switch (extention.ToLower())
                {
                    case "text":
                    case ".txt":
                    case "txt":
                        fileName += ".txt";
                        documentRpt.ExportToDisk(ExportFormatType.Text, cheminFichier + fileName);
                        break;
                    case "xml":
                    case ".xml":
                        fileName += ".xml";
                        documentRpt.ExportToDisk(ExportFormatType.Xml, cheminFichier + fileName);
                        break;
                    case "word":
                    case ".doc":
                    case ".docx":
                    case "doc":
                        fileName += ".doc";
                        documentRpt.ExportToDisk(ExportFormatType.WordForWindows, cheminFichier + fileName);
                        break;
                    case "excel":
                    case ".xls":
                    case "xls":
                        fileName += ".xls";
                        //documentRpt.ExportToDisk(ExportFormatType.Excel, cheminFichier + fileName);
                        // Configuration des options d'exportation pour Excel
                        ExcelFormatOptions excelFormatOptionss = new ExcelFormatOptions
                        {
                            ExcelUseConstantColumnWidth = false,
                            ShowGridLines = true, // ou false selon votre besoin
                            ExcelTabHasColumnHeadings = true
                        };

                        ExportOptions exportOptionss = documentRpt.ExportOptions;
                        exportOptionss.ExportFormatType = ExportFormatType.Excel;
                        exportOptionss.FormatOptions = excelFormatOptionss;

                        DiskFileDestinationOptions diskFileDestinationOptionss = new DiskFileDestinationOptions
                        {
                            DiskFileName = cheminFichier + fileName
                        };
                        exportOptionss.ExportDestinationOptions = diskFileDestinationOptionss;
                        exportOptionss.ExportDestinationType = ExportDestinationType.DiskFile;

                        documentRpt.Export();
                        break;
                    case ".xlsx":
                    case "xlsx":
                        fileName += ".xlsx";
                        // Configuration des options d'exportation pour Excel
                        ExcelFormatOptions excelFormatOptions = new ExcelFormatOptions
                        {
                            ExcelUseConstantColumnWidth = false,
                            ShowGridLines = false, // ou false selon votre besoin
                            ExcelTabHasColumnHeadings = true
                        };

                        ExportOptions exportOptions = documentRpt.ExportOptions;
                        exportOptions.ExportFormatType = ExportFormatType.ExcelWorkbook;
                        exportOptions.FormatOptions = excelFormatOptions;

                        DiskFileDestinationOptions diskFileDestinationOptions = new DiskFileDestinationOptions
                        {
                            DiskFileName = cheminFichier + fileName
                        };
                        exportOptions.ExportDestinationOptions = diskFileDestinationOptions;
                        exportOptions.ExportDestinationType = ExportDestinationType.DiskFile;

                        documentRpt.Export();
                        break;
                    case ".xlsxx":
                    case "xlsxx":
                        fileName += ".xls";
                        // Configuration des options d'exportation pour Excel
                        ExcelFormatOptions excelFormatOptionsss = new ExcelFormatOptions
                        {
                            ExcelUseConstantColumnWidth = false,
                            ShowGridLines = true, // ou false selon votre besoin
                            ExcelTabHasColumnHeadings = true
                        };

                        ExportOptions exportOptionsss = documentRpt.ExportOptions;
                        exportOptionsss.ExportFormatType = ExportFormatType.ExcelRecord;
                        exportOptionsss.FormatOptions = excelFormatOptionsss;

                        DiskFileDestinationOptions diskFileDestinationOptionsss = new DiskFileDestinationOptions
                        {
                            DiskFileName = cheminFichier + fileName
                        };
                        exportOptionsss.ExportDestinationOptions = diskFileDestinationOptionsss;
                        exportOptionsss.ExportDestinationType = ExportDestinationType.DiskFile;

                        documentRpt.Export();
                        break;
                    case ".pdf":
                    case "pdf":
                        fileName += ".pdf";
                        documentRpt.ExportToDisk(ExportFormatType.PortableDocFormat, cheminFichier + fileName);
                        break;
                    case "sansformat":
                        fileName += ".xls";
                        documentRpt.ExportToDisk(ExportFormatType.Text, cheminFichier + fileName);
                        break;
                    default:
                        fileName += ".pdf";
                        documentRpt.ExportToDisk(ExportFormatType.PortableDocFormat, cheminFichier + fileName);
                        break;
                }
            }

            return fileName;
        }
    }
}
