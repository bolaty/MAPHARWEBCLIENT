using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebApproVente : ReferencesGenerales
    {
        public static string URL_APPROVISIONNEMENT_VENTES = URL_ROOT_PROJET + "wsPhamouvementStock.svc/";

        ///URL TEMPLATE

        public static string URL_SELECT_APPROVISIONNEMENT_VENTES = URL_APPROVISIONNEMENT_VENTES + "pvgInsertIntoDatasetAppro";
        public static string URL_DELETE_APPROVISIONNEMENT_VENTES = URL_APPROVISIONNEMENT_VENTES + "pvgInsertIntoDatasetAppro";

    }
}