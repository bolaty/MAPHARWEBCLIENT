﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebNumCompte : ReferencesGenerales
    {
        public static string URL_NUM_COMPTE = URL_ROOT_PROJET + "wsPlancomptable.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_NUM_COMPTE = URL_NUM_COMPTE + "pvgChargerDansDataSet";

    }
}