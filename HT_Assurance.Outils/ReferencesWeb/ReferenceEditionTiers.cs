using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebEditionTiers : ReferencesGenerales
    {
        public static string URL_EDITION_TIERS = URL_ROOT_EDITION + "wsEdition.svc/";
        public static string URL_COMBOTYPETIERS = URL_ROOT_PROJET + "wsPhapartypetiers.svc/";
        public static string URL_EDITIONPARAMETRE2 = URL_ROOT_EDITION + "wsEditionEtatParametre.svc/";

        public static string URL_EDITIONS_TIERS = URL_ROOT_EDITION + "wsEditionEtatClientFournisseur.svc/";

        ///URL TEMPLATE
        public static string URL_SELECT_COMBOZONEEDITION = URL_EDITION_TIERS + "pvgInsertIntoDatasetZone";
        public static string URL_SELECT_COMBOSUCCURSALES = URL_EDITION_TIERS + "pvgChargerDansDataSetPourComboAgenceEdition";
        public static string URL_SELECT_COMBOTYPETIERS = URL_COMBOTYPETIERS + "pvgChargerDansDataSetPourCombo";
        public static string URL_SELECT_COMBOTYPETIERS_PROSPECT = URL_COMBOTYPETIERS + "pvgChargerDansDataSetPourCombo1";
        public static string URL_INSERT_URL_EDITION_TIERS = URL_EDITION_TIERS + "pvgInsertIntoDatasetEtatEntrepot";

        public static string URL_INSERT_CLIENT_FOURNISSEUR = URL_EDITIONS_TIERS + "pvgInsertIntoDatasetEtatClientFournisseur";
        public static string URL_INSERT_LISTE_COMMERCIAUX = URL_EDITIONS_TIERS + "pvgInsertIntoDatasetEtatListeCommerciaux";
        public static string URL_INSERT_LISTE_CHAUFFEUR = URL_EDITIONS_TIERS + "pvgInsertIntoDatasetEtatListeChauffeur";
        public static string URL_INSERT_TYPE_CLIENT = URL_EDITIONS_TIERS + "pvgInsertIntoDatasetEtatTypeClient";
        public static string URL_INSERT_RDV = URL_EDITIONS_TIERS + "pvgInsertIntoDatasetEtatRDV";
        public static string URL_INSERT_LISTE_VEHICULE = URL_EDITIONS_TIERS + "pvgInsertIntoDatasetEtatListeVehicule";
        public static string URL_INSERT_RELENCE = URL_EDITIONS_TIERS + "pvgInsertIntoDatasetEtatRelence";
    }
}