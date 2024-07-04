import pool from '../config/db.js';

export const getAllSnowDepths = async (req, res) => {
	// selects all data, as well as minimum and maximum values
	try {
		const result = await pool.query(`
		WITH snow_data AS (
		  SELECT
			ogc_fid,
			snow_depth,
			ST_AsGeoJSON(wkb_geometry)::json AS geometry
		  FROM snow_depth
		)
		SELECT json_build_object(
		  'type', 'FeatureCollection',
		  'features', json_agg(
			json_build_object(
			  'type', 'Feature',
			  'geometry', snow_data.geometry,
			  'properties', json_build_object(
				'ogc_fid', snow_data.ogc_fid,
				'snow_depth', snow_data.snow_depth
			  )
			)
		  ),
		  'min_snow_depth', MIN(snow_data.snow_depth),
		  'max_snow_depth', MAX(snow_data.snow_depth)
		) AS geojson
		FROM snow_data;
	  `);
		res.json(result.rows[0].geojson);
	} catch (error) {
		console.error('Erreur lors de la récupération des données:', error);
		res.status(500).send('Erreur du serveur');
	}
};
