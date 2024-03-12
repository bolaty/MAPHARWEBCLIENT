using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebReferenceReglementFactureClient : ReferencesGenerales 
    {
        public static string URL_REGLEMENTFACTURECLIENT = URL_ROOT_PROJET + "wsPhamouvementstockreglement.svc/"; 

        ///URL TEMPLATE

        public static string URL_INSERTREGLEMENTFACTURECLIENT = URL_REGLEMENTFACTURECLIENT + "pvgReglementClient";
        public static string URL_INSERTOPERATIONTRESORERIE1 = URL_REGLEMENTFACTURECLIENT + "pvgAjouterListeChargeAvecRepartition";

        public static string URL_INSERTOPERATIONTRESORERIETIERS = URL_REGLEMENTFACTURECLIENT + "pvgAjouterListeChargeAvecRepartitionReglementTresorerieTiers";

    }
}